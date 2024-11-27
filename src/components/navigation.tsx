import React from "react";
import { Link } from "react-router-dom";
import withRouter, { RouterProps } from "../utils/withRouter";

const categories = ["women", "men", "kids"];

interface PropsType {
  closeMobileNav?: () => void;
}

class Navigation extends React.Component<RouterProps & PropsType> {
  render(): React.ReactNode {
    const pathname = this.props.location.pathname;

    return (
      <nav>
        <ul className="flex flex-col gap-4 lg:flex-row">
          {categories.map((category) => {
            const isActive = pathname.includes(`products/${category}`);

            return (
              <li key={category}>
                <Link
                  to={`products/${category}`}
                  className={`text-base lg:pb-7 lg:px-4 lg:border-b-2 ${
                    isActive
                      ? "text-[#5ECE7B] border-[#5ECE7B]"
                      : "text-gray-700 border-transparent"
                  } hover:border-[#5ECE7B] hover:text-[#5ECE7B]`}
                  data-testid={
                    isActive ? "active-category-link" : "category-link"
                  }
                  onClick={() => {
                    this.props.closeMobileNav && this.props.closeMobileNav();
                  }}
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
