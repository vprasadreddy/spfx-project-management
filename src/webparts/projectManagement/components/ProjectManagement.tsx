import * as React from "react";
import styles from "./ProjectManagement.module.scss";
import { IProjectManagementProps } from "./IProjectManagementProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Projects from "./Projects/Projects";

export default class ProjectManagement extends React.Component<
  IProjectManagementProps,
  {}
> {
  public render(): React.ReactElement<IProjectManagementProps> {
    return (
      <div className={styles.projectManagement}>
        <Projects context={this.props.context}></Projects>
      </div>
    );
  }
}
