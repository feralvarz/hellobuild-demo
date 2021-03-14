import React from "react";
import { Card } from "react-bootstrap";
import "./Repo.scss";

interface IRepoLangs {
  name: string;
  color: string;
}

export interface IRepo {
  id: string;
  nameWithOwner: string;
  description: string;
  name: string;
  url: string;
  languages: {
    totalCount: number;
    nodes: IRepoLangs[];
  };
}

export const Repo: React.FC<{ data: IRepo; className?: string }> = ({
  data,
  className,
}) => {
  return (
    <div className={`mb-4 ${className || "col-lg-6"}`}>
      <Card className="repo-card h-100 shadow">
        <Card.Body>
          <Card.Title className="text-truncate">
            <a href={data.url} className="" target="_blank" rel="noreferrer">
              {data.name}
            </a>
          </Card.Title>
          <Card.Text className="card-description">
            {data.description || "No description"}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
