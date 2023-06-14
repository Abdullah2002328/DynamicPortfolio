const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
// Connect to MongoDB
const connectionString = 'mongodb://127.0.0.1/Web';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define the Mongoose schema
const formDataSchema = new mongoose.Schema({
    name: String,
    i1: String,
    i2: String,
    i3: String,
    dis: String,
    about: String,
    s1: String,
    s2: String,
    s3: String,
    sp1: String,
    sp2: String,
    sp3: String,
    pp1: String,
    pp2: String,
    pp3: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const FormData = mongoose.model('FormData', formDataSchema);

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve the static files
app.use(express.static('public'));

// Parse the request body and handle file uploads
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('image'));

// Define the route for submitting the form
app.post('/submit', (req, res) => {
  const { name, i1, i2, i3, dis, about, s1, s2, s3, sp1, sp2, sp3,
    pp1, pp2, pp3 } = req.body;
  const image = req.file;

  // Create a new document with the form data
  const formData = new FormData({
    name,
    i1, i2, i3,
    dis,
    about,
    s1,
    s2,
    s3,
    sp1,
    sp2,
    sp3,
    pp1,
    pp2,
    pp3,
    image: {
      data: image.buffer,
      contentType: 'image/png'
    }
  });

  // Save the form data to MongoDB
  formData.save()
    .then(() => {
      console.log('Form data saved to MongoDB');

      // Redirect to the success page
      res.redirect('/success');
    })
    .catch((error) => {
      console.error('Failed to save form data:', error);
      res.sendStatus(500);
    });
});

app.get('/success', (req, res) => {
  FormData.findOne()
    .sort({ _id: -1 }) // Sort by descending _id to get the most recent document
    .then((data) => {
      if (data && data.image && data.image.data) {
        const imageData = {
          contentType: data.image.contentType,
          data: data.image.data.toString('base64')
        };
        res.render('success', { data: { name: data.name, i1: data.i1, i2: data.i2, i3: data.i3, dis: data.dis, about: data.about, s1: data.s1, s2: data.s2, s3: data.s3, sp1: data.sp1, sp2: data.sp2, sp3: data.sp3, pp1: data.pp1, pp2: data.pp2, pp3: data.pp3, image: imageData } });
      } else {
        res.render('success', { data: null });
      }
    })
    .catch((error) => {
      console.error('Failed to fetch form data:', error);
      res.status(500).send('Internal Server Error');
    });
});

  
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
