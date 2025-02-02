import axios from 'axios';

class MailForm {
  constructor() {
    this._formSection = document.getElementById('inquiry');
    this._apiUrl = 'http://localhost:5000/send-';
  }

  sendQuery(data) {
    return axios.post(this._apiUrl, data);
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.formSubmit.bind(this));
  }

  async formSubmit(e) {
    e.preventDefault();
    console.log('this._resultAlert before:', this._resultAlert);

    if (!this._resultAlert) {
      console.log('Null');
      return; // Stop execution if the element is not found
    }

    const queryInfo = {
      email: this._form.elements.email.value,
      fromName: this._form.elements.fromName.value,
      subject: this._form.elements.subject.value,
      message: this._form.elements.message.value,
    };

    try {
      const newQuery = await this.sendQuery(queryInfo);
      console.log(queryInfo);

      const alertClass = newQuery.data.success
        ? 'alert-success'
        : 'alert-danger';
      const alertMessage = newQuery.data.success
        ? 'Email sent successfully.'
        : newQuery.data.message || 'An error occurred while sending email.';

      this._resultAlert.innerHTML = `
              <div class="alert alert-success d-flex align-items-center justify-content-center ${alertClass}" role="alert">
              <div class="align-items-center">
              <span><i class=" text-${
                alertClass === 'alert-success' ? 'success' : 'danger'
              } fa-solid fa-circle-check mx-2"></i></i>${alertMessage}</span>
              </div>
              </div>`;

      this._resultAlert.classList.remove('d-none', 'fade-out');

      setTimeout(() => this._resultAlert.classList.add('d-none'), 2000);
    } catch (error) {
      this._resultAlert.innerHTML = `
              <div class="alert alert-danger d-flex align-items-center justify-content-center" role="alert">
              <div class="align-items-center">
              <span><i class=" text-danger fa-solid fa-circle-check mx-2"></i></i>Email sending ${error}}.</span>
              </div>
              </div>`;

      this._resultAlert.classList.remove('d-none', 'fade-out');

      setTimeout(() => this._resultAlert.classList.add('d-none'), 2000);
    }

    this._form.elements.email.value = '';
    this._form.elements.fromName.value = '';
    this._form.elements.subject.value = '';
    this._form.elements.message.value = '';
    console.log('this._resultAlert after:', this._resultAlert);
  }

  render() {
    this._formSection.innerHTML = `
    <div class="container">
    <div class="text-center">
        <h1>Let's Connect</h1>
        <p class="lead mb-1">Have a question or need more information? We're here to help. </p>
     </div>

    <div class="row align-items-center justify-content-center my-3">
      <div class="col-md-6">
          <form id="form" action="send" method="POST">
            <label for="email" class="form-label">Email address:</label>
            <div class="input-group mb-4">
              <span class="input-group-text">
              <i class="fa-solid fa-envelope"></i>
              </span>
              <input type="email" name="email" class="form-control" id="email" placeholder="e.g sample@email.com"  required>
            </div>

          <label for="fromName" class="form-label">Name:</label>
          <div class="input-group mb-4">
            <span class="input-group-text">
            <i class="fa-solid fa-person"></i>
            </span>
            <input type="text" name="fromName" class="form-control" id="fromName" placeholder="name" required>
          </div>

          <label for="subject" class="form-label">What is your question about?</label> 
          <div class="input-group mb-4">
            <span class="input-group-text">
            <i class="fa-solid fa-question"></i>
            </span>

          <select class="form-select" name="subject">
            <option>About Plus</option>
            <option value="content">Content query</option>
            <option value="other">Other query</option>
          </select>
          </div>

          <div class="form-floating mb-4 mt-5">
            <textarea  id="message" name="message" class="form-control" style="height: 140px" required></textarea>
            <label for="message"> Your query. . .</label>
          </div>
 
          <div class="mb-4 text-center">
            <button type="submit" class="btn btn-outline-primary">Submit</button>
          </div>

           <div id="result" class="alert alert-container" role="alert">
           </div>              
       </form>
     </div>
   </div>   
   </div>
    `;
    this._form = document.getElementById('form');
    this._resultAlert = document.querySelector('#result');
    this.addEventListeners();
  }
}

export default MailForm;
