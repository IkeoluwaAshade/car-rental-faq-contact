import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    yourName: '',   // Changed from 'name'
    emailAddress: '', // Changed from 'email'
    subject: '',     // Added subject
    department: '',
    message: '',   // Changed from 'question'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);  // To manage loading state
  const [responseMessage, setResponseMessage] = useState('');  // To display success/error message

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.yourName) {
      tempErrors.yourName = "Name is required";
      isValid = false;
    }

    if (!formData.emailAddress) {
      tempErrors.emailAddress = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      tempErrors.emailAddress = "Email is not valid";
      isValid = false;
    }

    if (!formData.subject) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message) {
      tempErrors.message = "Please ask your question";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setResponseMessage('');  // Clear previous messages

      try {
        // Set default department to 'N/A' if not provided
        const finalFormData = {
          ...formData,
          department: formData.department || 'N/A',
        };

        // Make POST request to the backend API
        const response = await axios.post('https://car-rental-okvm.onrender.com/contact-us', finalFormData);

        // Handle successful response
        setResponseMessage('Message sent successfully!');
        setLoading(false);

        // Clear form fields after successful submission
        setFormData({
          yourName: '',
          emailAddress: '',
          subject: '',
          department: '',
          message: '',
        });

      } catch (error) {
        // Handle error response
        setResponseMessage('Failed to send the message. Please try again.');
        setLoading(false);
      }
    }
  };

  return (
    <div className='w-full flex justify-center items-center'>
      <div className="container flex justify-center items-center w-full mt-4">
        <div className="wrapper flex flex-col justify-center items-center w-[90%]">
          <div className="get-in-touch-div flex flex-col justify-center items-center">
            <div className="contact-us bg-gray-300 text-customAccordionColor p-4 text-center rounded-3xl text-2xl mb-6 w-[250px]">
              Contact us today                   
            </div>
            <div className="get-in-touch w-[370px] text-center italic text-black text-3xl font-bold mb-8">
              Get in touch with us and ask your <span className='underline text-customYellow'>questions!</span>
            </div>
          </div>
          <div className='form-container bg-formBg w-full rounded-2xl'>
            <form onSubmit={handleSubmit} autoComplete='on' className='flex flex-col justify-center items-center text-customAccordionColor m-10'>
              <div className="name-and-email flex flex-col md:flex-row md:justify-between w-full">
                <div className="name text-sm leading-loose w-full md:w-[48%]">
                  <label>Your Name (*)</label> <br />
                  <input 
                    type="text" 
                    name="yourName"  // Changed name
                    value={formData.yourName}
                    onChange={handleChange} 
                    className='w-full h-[45px] rounded-2xl p-4' 
                  />
                  {errors.yourName && <p className="text-red-500 text-xs mt-1">{errors.yourName}</p>}
                </div>

                <div className="email text-sm leading-loose w-full md:w-[48%] mt-5 md:mt-0">
                  <label>Your Email (*)</label> <br />
                  <input 
                    type="text" 
                    name="emailAddress"  // Changed name
                    value={formData.emailAddress}
                    onChange={handleChange} 
                    className='w-full h-[45px] rounded-2xl p-4' 
                  />
                  {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
                </div>
              </div> 
              <br />

              <div className="subject text-sm leading-loose w-full">
                <label>Subject (*)</label> <br />
                <input 
                  type="text" 
                  name="subject"  // Added subject input
                  value={formData.subject}
                  onChange={handleChange} 
                  className='w-full h-[45px] rounded-2xl p-4' 
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <br />

              <div className="department text-sm leading-loose w-full">
                <label>Department</label> <br />
                <select 
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className='w-full h-[45px] rounded-2xl'
                >
                  <option value="">Select Department</option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="General">General</option>
                </select>
              </div>
              <br />

              <div className="message leading-loose w-full">
                <label>Your Message (*)</label> <br />
                <textarea 
                  name="message"  // Changed name
                  rows="7" 
                  value={formData.message}
                  onChange={handleChange} 
                  className='w-full rounded-2xl p-4'
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <div className="button-div mt-4">
                <button 
                  type="submit" 
                  className='bg-customYellow text-black w-[120px] h-7 p-6 rounded-3xl font-bold flex justify-center items-center text-xl'
                  disabled={loading}  // Disable button when loading
                >
                  {loading ? 'Sending...' : 'Submit'}   
                </button>
              </div>

              {responseMessage && (
                <div className="mt-4">
                  <p>{responseMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;



