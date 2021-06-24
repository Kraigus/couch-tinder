const $selectForm = document.querySelector('.form-select');
console.log($selectForm);
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

function createNewList(coach) {
  return `<div class="col-4 my-2">
  <div class="card">
    <img src="" class="card-img-top" alt="Avatar">
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
