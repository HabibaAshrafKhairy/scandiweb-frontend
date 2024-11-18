import React from "react";
import { Link } from "react-router-dom";
import withRouter, { RouterProps } from "../utils/withRouter";

const categories = ["women", "men", "kids"];

class Navigation extends React.Component<RouterProps> {
  render(): React.ReactNode {
    const pathname = this.props.location.pathname;

    return (
      <nav>
        <ul className="flex">
          {categories.map((category) => {
            const isActive = pathname.includes(`products/${category}`);

            return (
              <li key={category}>
                <Link
                  to={`products/${category}`}
                  className={`text-base pb-7 px-4 border-b-2 ${
                    isActive
                      ? "border-[#5ECE7B] text-[#5ECE7B]"
                      : "border-transparent"
                  } hover:border-[#5ECE7B] hover:text-[#5ECE7B]`}
                  data-testid={
                    isActive ? "active-category-link" : "category-link"
                  }
                >
                  {category.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navigation);
