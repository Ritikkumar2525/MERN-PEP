function submitComplaint() {
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
  
    if (!fullname || !email || !phone || !title || !description) {
      alert("Please fill all fields!");
      return;
    }
  
    fetch("/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        email,
        phone,
        title,
        description
      })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("message").innerText =
        `✅ Complaint submitted successfully! Your ID is: ${data.id}`;
  
      // Clear form
      document.getElementById("fullname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong!");
    });
  }
  
  
  function loadComplaints() {
    fetch("/complaints")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("complaints");
      container.innerHTML = "";
  
      if (data.length === 0) {
        container.innerHTML = "<p>No complaints found.</p>";
        return;
      }
  
      data.forEach(c => {
  
        container.innerHTML += `
          <div class="card">
            <p><b>ID:</b> ${c.id}</p>
            <p><b>Name:</b> ${c.fullname}</p>
            <p><b>Email:</b> ${c.email}</p>
            <p><b>Phone:</b> ${c.phone}</p>
            <p><b>Subject:</b> ${c.title}</p>
            <p><b>Description:</b> ${c.description}</p>
  
            <p><b>Status:</b> 
              <span class="status-${c.status}">
                ${c.status}
              </span>
            </p>
  
            <select onchange="updateStatus(${c.id}, this.value)">
              <option value="pending" ${c.status === "pending" ? "selected" : ""}>Pending</option>
              <option value="resolved" ${c.status === "resolved" ? "selected" : ""}>Resolved</option>
              <option value="rejected" ${c.status === "rejected" ? "selected" : ""}>Rejected</option>
            </select>
  
            <button onclick="deleteComplaint(${c.id})">
              Delete
            </button>
          </div>
        `;
      });
  
    })
    .catch(err => {
      console.error(err);
      alert("Error loading complaints");
    });
  }
  
  
  
  // ===============================
  // UPDATE STATUS
  // ===============================
  function updateStatus(id, status) {
  
    fetch(`/complaints/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(() => {
      loadComplaints();
    })
    .catch(err => {
      console.error(err);
      alert("Error updating status");
    });
  }
  
  
  

  function deleteComplaint(id) {
  
    if (!confirm("Are you sure you want to delete this complaint?")) {
      return;
    }
  
    fetch(`/complaints/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      loadComplaints();
    })
    .catch(err => {
      console.error(err);
      alert("Error deleting complaint");
    });
  }