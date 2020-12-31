import React from "react";
import API from "@aws-amplify/api";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql/lib/types";

function App() {
  const todoDetails = {
    name: "test",
    description: "test",
  };
  const generateTodo = async () => {
    try {
      await API.graphql({
        query: mutations.createTodo,
        variables: { input: todoDetails },
        authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getList = async () => {
    try {
      console.log(
        await API.graphql({
          query: queries.listTodos,
          authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={getList}>Query</button>
      <button onClick={generateTodo}>Mutation</button>
    </>
  );
}

export default App;
