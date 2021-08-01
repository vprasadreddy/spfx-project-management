import * as React from "react";
import styles from "../ProjectManagement.module.scss";
import { ProjectsProps } from "./ProjectsProps";
import { ProjectsStates } from "./ProjectsStates";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from "@microsoft/sp-http";

import { escape } from "@microsoft/sp-lodash-subset";

export default class Projects extends React.Component<
  ProjectsProps,
  ProjectsStates
> {
  constructor(props: ProjectsProps, state: ProjectsStates) {
    super(props);
    this.state = {
      items: []
    };
  }

  public getItems(filterValue) {
    if (filterValue == "*") {
      this.props.context.spHttpClient
        .get(
          `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Projects')/items?$expand=ProjectManager&$select=*,ProjectManager,ProjectManager/Title,ProjectManager/EMail`,
          SPHttpClient.configurations.v1
        )
        .then((response: SPHttpClientResponse): Promise<{ value: any[] }> => {
          return response.json();
        })
        .then((response: { value: any[] }) => {
          let projectItems = [];
          //projectItems = projectItems.concat(response.value);
          //console.log(response.value);
          //console.log(projectItems);
          this.setState({ items: response.value });
        });
    } else {
      this.props.context.spHttpClient
        .get(
          `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Projects')/items?$expand=ProjectManager&$select=*,ProjectManager,ProjectManager/Title,ProjectManager/EMail&$filter=Status eq '${filterValue}'`,
          SPHttpClient.configurations.v1
        )
        .then((response: SPHttpClientResponse): Promise<{ value: any[] }> => {
          return response.json();
        })
        .then((response: { value: any[] }) => {
          //let projectItems = [];
          //projectItems.concat(response.value);
          //console.log(response.value);
          //console.log(projectItems);
          this.setState({ items: response.value });
        });
    }
  }

  public getFilterValue(filterValue) {
    switch (filterValue) {
      case "*":
        return this.getItems(filterValue);
      case "New":
        return this.getItems(filterValue);
      case "In Progress":
        return this.getItems(filterValue);
      case "Completed":
        return this.getItems(filterValue);
      default:
        return this.getItems(filterValue);
    }
  }

  public componentDidMount() {
    let filterValue = "*";
    this.getItems(filterValue);
  }

  public render(): React.ReactElement<ProjectsProps> {
    return (
      <div>
        <button
          onClick={() => this.getFilterValue("*")}
          className={styles.secondaryBtn}
        >
          All Items
        </button>
        <button
          onClick={() => this.getFilterValue("New")}
          className={styles.primaryBtn}
        >
          New
        </button>
        <button
          onClick={() => this.getFilterValue("In Progress")}
          className={styles.warningBtn}
        >
          In Progress
        </button>
        <button
          onClick={() => this.getFilterValue("Completed")}
          className={styles.completedBtn}
        >
          Completed
        </button>
        <h2>List of Projects</h2>
        {this.state.items.map((item, key) => {
          return (
            <div key={key}>
              <h3>{item.Title}</h3>
              <p>Assigned To: {item.ProjectManager.Title}</p>
              <p>Status: {item.Status}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
