const $formLk = document.forms.formLk;
$formLk.addEventListener("submit", async (e) => {
  e.preventDefault();

  const obj = {
    firstName: $formLk.firstName.value,
    lastName: $formLk.lastName.value,
    middleName: $formLk.middleName.value,
    specialization: $formLk.specialization.value,
    level: $formLk.level.value,
  };
  console.log(obj);

  console.log(" $formLk.action ==>", $formLk.action);

  const response = await fetch($formLk.action, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  if (response.ok) {
    window.location = "/";
  } else {
    console.log("error");
  }
});
