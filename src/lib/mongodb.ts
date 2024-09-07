import mongoose from 'mongoose'

const connectDB = async () => {
   try {
      // Check if the database is already connected
      if (mongoose.connection.readyState !== 1)
         await mongoose.connect(process.env.MONGODB_URI!, {})
   } catch (error) {
      console.error('Error connecting to database:', error)
      process.exit(1) // Exit process with failure code
   }
}

export default connectDB
