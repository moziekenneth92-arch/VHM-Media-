document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("regForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !submitBtn) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    const selectedGender =
      form.querySelector('input[name="gender"]:checked')?.value || "Not selected";

    const payload = {
      access_key: "e520ef25-1ade-4cf1-8138-c63df3a50548",

      name: `${form.first_name.value} ${form.last_name.value}`,
      email: form.parent_email.value, // user email (NOT your receiver email)

      gender: selectedGender,
      dob: form.dob.value,

      parent_name: form.parent_name.value,
      parent_phone: form.parent_phone.value,
      parent_email: form.parent_email.value,

      school_name: form.school_name.value,
      current_class: form.current_class.value,

      address: form.address.value,
      state: form.state.value,
      lga: form.lga.value,

      message: `
NEW REGISTRATION SUBMISSION

Name: ${form.first_name.value} ${form.last_name.value}
Gender: ${selectedGender}
DOB: ${form.dob.value}

Parent Name: ${form.parent_name.value}
Parent Phone: ${form.parent_phone.value}
Parent Email: ${form.parent_email.value}

School: ${form.school_name.value}
Class: ${form.current_class.value}

Address: ${form.address.value}
State: ${form.state.value}
LGA: ${form.lga.value}

Time: ${new Date().toLocaleString()}
      `
    };

    try {

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {

        localStorage.setItem("candidateData", JSON.stringify(payload));

        submitBtn.innerText = "Success! Redirecting...";

        window.location.href = "success.html";

      } else {
        throw new Error(result.message || "Submission failed");
      }

    } catch (error) {

      console.error("Web3Forms Error:", error);

      alert("❌ Failed to send form. Try again.");

      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Registration";
    }

  });

});