const students = [];

function addStudent() {
  const name = document.getElementById('studentName').value.trim();
  const id = document.getElementById('studentID').value.trim();
  const studentClass = document.getElementById('studentClass').value.trim();

  if (!name || !id || !studentClass) {
    alert('Please fill all fields');
    return;
  }

  // Check if student ID already exists
  if (students.some(s => s.id === id)) {
    alert('Student ID already exists!');
    return;
  }

  const student = {
    name,
    id,
    studentClass,
    attendance: 'Absent',
    grades: 'N/A',
  };

  students.push(student);
  clearForm();
  renderStudents();
}

function clearForm() {
  document.getElementById('studentName').value = '';
  document.getElementById('studentID').value = '';
  document.getElementById('studentClass').value = '';
}

function renderStudents() {
  const tbody = document.querySelector('#studentsTable tbody');
  tbody.innerHTML = '';

  students.forEach((student, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.studentClass}</td>
      <td>
        <select onchange="updateAttendance(${index}, this.value)">
          <option value="Present" ${student.attendance === 'Present' ? 'selected' : ''}>Present</option>
          <option value="Absent" ${student.attendance === 'Absent' ? 'selected' : ''}>Absent</option>
        </select>
      </td>
      <td>
        <input type="text" value="${student.grades}" onchange="updateGrades(${index}, this.value)" />
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function updateAttendance(index, value) {
  students[index].attendance = value;
}

function updateGrades(index, value) {
  students[index].grades = value;
}

// Initial render (empty list)
renderStudents();
