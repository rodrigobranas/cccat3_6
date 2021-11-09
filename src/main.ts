import DatabaseConnectionAdapter from "./shared/infra/database/DatabaseConnectionAdapter";
import EventBus from "./shared/infra/event/EventBus";
import ExpressAdapter  from "./shared/infra/http/ExpressAdapter";
import Router from "./shared/infra/http/Router";

const http = new ExpressAdapter();
const databaseConnection = new DatabaseConnectionAdapter();
const eventBus = new EventBus();

const router = new Router(http, databaseConnection, eventBus);

http.listen(3000);