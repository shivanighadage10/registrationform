document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const fullName = document.getElementById('fullName').value.trim();
    const aadhar = document.getElementById('aadhar').value.trim();
    const pan = document.getElementById('pan').value.trim().toUpperCase();
    const mobile = document.getElementById('mobile').value.trim();
    const dob = document.getElementById('dob').value;
    const marks = Array.from(document.querySelectorAll('.mark')).map(input => parseInt(input.value));
  
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "";
    const middleName = nameParts.length === 3 ? nameParts[1] : "";
    const lastName = nameParts[nameParts.length - 1] || "";
  
    if (!/^\d{12}$/.test(aadhar)) {
      alert("Aadhar number must be a 12-digit number.");
      return;
    }
  
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      alert("PAN number must follow the format: ABCDE1234F.");
      return;
    }
  
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }
  
    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate >= today) {
      alert("Date of birth cannot be in the future.");
      return;
    }
  
    if (marks.some(isNaN)) {
      alert("Please enter valid marks for all 6 subjects.");
      return;
    }
  
    marks.sort((a, b) => b - a);
    const bestFiveTotal = marks.slice(0, 5).reduce((a, b) => a + b, 0);
    const percentage = (bestFiveTotal / 500 * 100).toFixed(2);
  
    const result = `
      <strong>First Name:</strong> ${firstName}<br>
      <strong>Middle Name:</strong> ${middleName}<br>
      <strong>Last Name:</strong> ${lastName}<br>
      <strong>Best 5 Marks Total:</strong> ${bestFiveTotal}<br>
      <strong>Percentage:</strong> ${percentage}%
    `;
  
    const resultBox = document.getElementById('result');
    resultBox.classList.remove('d-none');
    resultBox.innerHTML = result;
  });
  