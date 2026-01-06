import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    console.log('Submitting to:', `${API_URL}/api/contact`);
    console.log('Form data:', form);
    
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Please check if backend is running on port 9000.');
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      
      if (res.ok && data.status === 'success') {
        setStatus({ type: 'success', message: data.message || 'Message sent successfully!' });
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to send message' });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus({ 
        type: 'error', 
        message: `Error: ${err.message}. Please ensure the backend server is running on port 9000.` 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section
        className="d-flex align-items-center text-white"
        style={{
          minHeight: '300px',
          backgroundImage: `url('https://source.unsplash.com/1600x400/?office,contact')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', top: 0, left: 0 }}
        ></div>

        {/* Content */}
        <div className="container text-center position-relative">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead mb-0">
            <a href="/" className="text-decoration-none text-white">Home</a> &gt; Contact Us
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container my-5">
        <div className="row">
          {/* Map */}
          <div className="col-md-6 mb-4">
            <div className="border rounded overflow-hidden" style={{ height: '350px' }}>
              <iframe
                title="Tailstoi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393031.9271450581!2d-2.8448187!3d13.2123241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xecf1f06b861fc5f%3A0x0!2sTailstoi!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <h3>Our Address</h3>
            <p>Ethiopia Desse</p>
            <p>Email: sileshiashenafi@gmail.com</p>
            <p>Phone: +251968277909</p>
            <hr />
            <h4>Send us a message</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Service Inquiry, Appointment Request"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" className="btn btn-danger w-100" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {status && (
                <div className={`mt-3 alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
