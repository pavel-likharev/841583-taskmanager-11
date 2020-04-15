import {createBoardTemplate} from "src/components/board.js";
import {createFilterTemplate} from "src/components/filter.js";
import {createLoadMoreButtonTemplate} from "src/components/load-more-button.js";
import {createTaskEditTemplate} from "src/components/task-edit.js";
import {createTaskTemplate} from "src/components/task.js";
import {createSiteMenuTemplate} from "src/components/site-menu.js";
import {createSortingTemplate} from "src/components/sorting.js";
import {generateFilters} from "src/mock/filter.js";
import {generateTasks} from "src/mock/task.js";

const TASK_COUNT = 22;
const TASK_EDIT_LIMIT = 1;

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(TASK_EDIT_LIMIT, showingTasksCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
