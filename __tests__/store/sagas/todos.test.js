import { sagaTestHelper } from "../../../src/utils";
import * as Api from "../../../src/utils";
import * as sagas from "../../../src/store/sagas/todos";
import * as actions from "../../../src/store/actions";

describe("todos:", () => {
  describe("#fetchAllTodos()", () => {
    Api.fetchTodos = jest.fn();
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it("should call Api.fetchTodos, succeed, and put receiveTodos action", async () => {
      const todos = [{ completed: false, id: 1, text: "foo" }];
      Api.fetchTodos.mockResolvedValue(todos);
      const dispatched = await sagaTestHelper(sagas.fetchAllTodos, {});
      expect(dispatched).toContainEqual(actions.recieveTodos(todos));
      expect(dispatched).not.toContainEqual(actions.getTodosFailed());
    });
    it("should call Api.fetchTodos, fail, and put getTodosFailed action", async () => {
      const e = new Error("api error");
      Api.fetchTodos.mockRejectedValue(e);
      const dispatched = await sagaTestHelper(sagas.fetchAllTodos, {});
      expect(dispatched).toContainEqual(actions.getTodosFailed(e));
      expect(dispatched).not.toContainEqual(actions.recieveTodos(e));
    });
  });

  describe("#addZenTodos()", () => {
    Api.getZen = jest.fn();
    Api.addTodo = jest.fn();
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it("should call Api.getZen, Api.addTodo, succeed, and put getTodos action", async () => {
      const dispatched = await sagaTestHelper(sagas.addZenTodo, {});
      expect(dispatched).toContainEqual(actions.getTodos());
      expect(dispatched).not.toContainEqual(actions.getTodosFailed());
    });
    it("should call Api.addZenTodo, fail, and put getTodosFailed action", async () => {
      const e = new Error("api error");
      Api.getZen.mockRejectedValue(e);
      const dispatched = await sagaTestHelper(sagas.addZenTodo, {});
      expect(dispatched).toContainEqual(actions.getTodosFailed(e));
      expect(dispatched).not.toContainEqual(actions.getTodos());
    });
  });

  describe("#doAdd()", () => {
    Api.addTodo = jest.fn();
    beforeEach(() => {
      jest.resetAllMocks();
    });
    it("should call Api.doAdd, succeed, and put getTodos action", async () => {
      const dispatched = await sagaTestHelper(sagas.doAdd, {});
      expect(dispatched).toContainEqual(actions.getTodos());
      expect(dispatched).not.toContainEqual(actions.getTodosFailed());
    });
    it("should call Api.doAdd, fail, and put getTodosFailed action", async () => {
      const e = new Error("api error");
      Api.addTodo.mockRejectedValue(e);
      const dispatched = await sagaTestHelper(sagas.doAdd, {});
      expect(dispatched).toContainEqual(actions.getTodosFailed(e));
      expect(dispatched).not.toContainEqual(actions.recieveTodos());
    });
  });
});
