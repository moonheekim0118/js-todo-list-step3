import { CLASS_NAMES } from "../../utils/constants.js";

export const priorityTemplate = {
  NONE: `
    <select class="chip select" data-action="selectPriority">
      <option value="NONE">순위</option>
      <option value="FIRST">1순위</option>
      <option value="SECOND">2순위</option>
    </select>
  `,
  FIRST: `<span class="chip primary">1순위</span>`,
  SECOND: `<span class="chip secondary">2순위</span>`,
};

const todoInputView = `
<section class="input-container">
<input
  class="new-todo"
  placeholder="할 일을 입력해주세요."
  autofocus
/>
</section>`;

const clearBtnView = `<button class="clear-completed">모두 삭제</button>`;

const todoFilterView = `
<ul class="filters">
  <li>
    <a href="#all" class="selected">전체보기</a>
  </li>
  <li>
    <a href="#priority" class="sort">우선 순위</a>
  </li>
  <li>
    <a href="#active" class="active">해야할 일</a>
  </li>
  <li>
    <a href="#completed" class="completed">완료한 일</a>
  </li>
</ul>
`;

const MemberTitleView = (name) =>
  `
<h2>
  <span><strong>${name}</strong>'s Todo List</span>
</h2>
`;

const todoCountView = (count) =>
  `<span class="todo-count">총 <strong>${count}</strong> 개</span>`;

export const todoItemView = (todo) => {
  return `
    <li data-contents=${todo.contents} data-item=${
    todo._id
  } class="todo-list-item ${todo.isCompleted ? CLASS_NAMES.COMPLETED : ""}">
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.isCompleted && "checked"}/>
        <label class="label">
          ${priorityTemplate[todo.priority] ?? priorityTemplate.NONE}
          ${todo.contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.contents}" />
    </li>
  `;
};

export const teamTitleView = (title) =>
  `<span><strong>${title}</strong>'s Todo List</span>`;

export const todoListView = (member) => `
  <li class="todoapp-container" data-member=${member._id}>
    ${MemberTitleView(member.name)}
    <div class="todoapp">
    ${todoInputView}
    <section class="main">
      <ul class="todo-list">
        ${member.todoList.map((todo) => todoItemView(todo)).join("")}
      </ul>
    </section>
    <div class="count-container">
    ${todoCountView(member.todoList.length)}
    ${todoFilterView}
    ${clearBtnView}
    </div>
    </div>
  </li>
`;

export const addMemberBtnView = `
<li class="add-user-button-container">
  <button id="add-user-button" class="ripple">
    <span class="material-icons">add</span>
  </button>
</li>`;
