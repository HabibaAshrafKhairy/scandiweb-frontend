import React from "react";
import { Link } from "react-router-dom";
import withRouter, { RouterProps } from "../utils/withRouter";
import { DataProps, graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORIES } from "../graphql/queries";
import { Category } from "../types";
import toast from "react-hot-toast";

interface GraphQLResponse {
  categories: Category[];
}

// Props injected by the graphql HOC
type GraphQLProps = DataProps<GraphQLResponse>;

// Custom props for the component
interface CustomProps {
  closeMobileNav?: () => void;
}

// Combined props for the Navigation component
type CombinedProps = RouterProps & CustomProps & Partial<GraphQLProps>;

class Navigation extends React.Component<CombinedProps> {
  renderCategories(
    categories: Category[],
    pathname: string,
    closeMobileNav?: () => void
  ) {
    return categories.map((category) => {
      const isActive = pathname.includes(`${category.name}`);

      return (
        <li key={category.id}>
          <Link
            to={`${category.name}`}
            className={`text-base lg:pb-7 lg:px-4 lg:border-b-2 ${
              isActive
                ? "text-[#5ECE7B] border-[#5ECE7B]"
                : "text-gray-700 border-transparent"
            } hover:border-[#5ECE7B] hover:text-[#5ECE7B]`}
            data-testid={isActive ? "active-category-link" : "category-link"}
            onClick={() => closeMobileNav && closeMobileNav()}
          >
            {category.name.toUpperCase()}
          </Link>
        </li>
      );
    });
  }

  render(): React.ReactNode {
    const { location, closeMobileNav, data } = this.props;

    if (!data) return null; // Return nothing if data is unavailable
    if (data.loading) return <p>Loading...</p>;
    if (data.error) {
      toast.error("Failed to load categories");
      return null;
    }

    const categories = data.categories || [];
    const pathname = location.pathname;

    return (
      <nav>
        <ul className="flex flex-col gap-4 lg:flex-row">
          {this.renderCategories(categories, pathname, closeMobileNav)}
        </ul>
      </nav>
    );
  }
}

export default withRouter(
  graphql<CombinedProps, {}, {}, CombinedProps>(GET_CATEGORIES)(Navigation)
);
