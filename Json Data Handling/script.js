fetch('data.json')
  .then(response => response.json())
  .then(data => {
    document.querySelector("h1").textContent = `Welcome to ${data.school_name} - ${data.class}`;
    document.getElementById("president").textContent = data.info.president;
    document.getElementById("address").textContent = data.info.address;
    document.getElementById("contact").textContent = `${data.info.contacts.email} | ${data.info.contacts.tel}`;

    const dropdown = document.getElementById("studentSelect");
    const detailsDiv = document.getElementById("studentDetails");

    data.students.forEach(student => {
      const option = document.createElement("option");
      option.value = student.id;
      option.textContent = student.id;
      dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", function () {
      const selectedId = this.value;
      const student = data.students.find(s => s.id === selectedId);

      if (student) {
        let grades = "";
        for (let subject in student.grade) {
          grades += `<li>${subject}: ${student.grade[subject]}</li>`;
        }

        detailsDiv.innerHTML = `
          <h3>Name: ${student.name}</h3>
          <p><strong>Grades:</strong></p>
          <ul>${grades}</ul>
        `;
      } else {
        detailsDiv.innerHTML = "";
      }
    });
  })
  .catch(error => {
    console.error("Error loading data:", error);
  });
