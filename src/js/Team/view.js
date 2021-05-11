const teamAddButtonView = `
<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
    <span class="material-icons">add</span>
    </button>
</div>`;

const teamCardView = (id, name) => `
<div class="team-card-container" dataset-id=${id}>
<a href="/kanban.html?id=${id}" class="card">
  <div class="card-title">
    ${name}
  </div>
</a>
</div>
`;

const teamListView = (data = []) => {
  const list = data.map((element) => teamCardView(element._id, element.name));
  list.push(teamAddButtonView);
  return list.join("");
};

export default teamListView;
