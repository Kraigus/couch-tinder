const $selectForm = document.querySelector('.form-select');
console.log($selectForm);
if ($selectForm) {
  $selectForm.addEventListener('change', async (e) => {
    e.preventDefault();
    const getSpecResponce = await fetch('/coaches', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ specialization: e.target.value }),
    });
    const { coaches } = await getSpecResponce.json();
    console.log('>>>>>>>>>>>>>>>>>>>', coaches[0]);
    const $coachContainer = document.querySelector('[data-coaches]');
    $coachContainer.innerHTML = '';
    coaches.map((el) => {
      $coachContainer.insertAdjacentHTML('beforeend', createNewList(el));
    });
  });
}

function createNewList(coach) {
  return `<div class="col-4 my-2">
  <div class="card">
    <img src="https://st.depositphotos.com/1003711/1972/i/600/depositphotos_19720535-stock-photo-no-face-man.jpg" class="card-img-top" alt="Avatar">
    <div class="card-body">
      <h5 class="card-title">${coach.firstName} ${coach.lastName}</h5>
      <p class="card-text">
        <ul>
          <li>Специализация: ${coach.specialization}</li>
          <li>Уровень: ${coach.level}</li>
        </ul>
      </p>
      <a href="/coaches/${coach._id}" class="btn btn-primary">Перейти к анкете</a>
    </div>
  </div>
</div>`;
}
const $formLk = document.forms.formLk;
if ($formLk) {
  $formLk.addEventListener('submit', async (e) => {
    e.preventDefault();

    const obj = {
      firstName: $formLk.firstName.value,
      lastName: $formLk.lastName.value,
      middleName: $formLk.middleName.value,
      specialization: $formLk.specialization.value,
      level: $formLk.level.value,
    };
    console.log(obj);

    console.log(' $formLk.action ==>', $formLk.action);

    const response = await fetch($formLk.action, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (response.ok) {
      window.location = '/';
    } else {
      console.log('error');
    }
  });
}

const editEntryForm = document.querySelector('#editEntryForm');
const deleteEntryButton = document.querySelector('#deleteEntryButton');

if (editEntryForm) {
  editEntryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch(`/posts/${event.target.dataset.entryid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: event.target.title.value,
        body: event.target.body.value,
      }),
    });

    const responseJson = await response.json();

    if (!responseJson.isUpdateSuccessful) {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error');
      errorDiv.innerText = responseJson.errorMessage;
      event.target.parentElement.append(errorDiv);
      return;
    }

    window.location = `/posts/${responseJson.entryID}`;
  });
}

if (deleteEntryButton) {
  deleteEntryButton.addEventListener('click', async (event) => {
    const response = await fetch(`/posts/${event.target.dataset.entryid}`, {
      method: 'DELETE',
    });

    const responseJson = await response.json();

    if (!responseJson.isDeleteSuccessful) {
      const errorLi = document.createElement('li');
      errorLi.classList.add('pipe-separate');
      errorLi.classList.add('left');
      errorLi.classList.add('error');
      errorLi.innerText = responseJson.errorMessage;
      const editAndDeleteUl = document.querySelector('#editAndDeleteUl');
      editAndDeleteUl.append(errorLi);
      return;
    }
    window.location = '/posts';
  });
}
