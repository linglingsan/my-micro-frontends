import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "../../utils";

const baseUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);

  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 2000);

  useEffect(() => {
    fetch(`${baseUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${baseUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
