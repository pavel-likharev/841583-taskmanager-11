import BoardComponent from "src/components/board.js";
import BoardController from 'src/controllers/board.js';
import FilterComponent from "src/components/filter.js";
import SiteMenuComponent from "src/components/site-menu.js";
import {generateFilters} from "src/mock/filter.js";
import {generateTasks} from "src/mock/task.js";
import {render, RenderPosition} from 'src/utils/render.js';

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
