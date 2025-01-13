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
  render(): React.ReactNode {
    const { location, closeMobileNav, data } = this.props;

    // Handle loading or error states from GraphQL
    if (!data) return;
    if (data?.loading) return <p>Loading...</p>;
    if (data?.error) toast.error("Failed to load categories");

    const categories = data?.categories || []; // Default to empty array if no categories
    const pathname = location.pathname;

    return (
      <nav>
        <ul className="flex flex-col gap-4 lg:flex-row">
          {categories.map((category) => {
            const isActive = pathname.includes(`products/${category.name}`);

            return (
              <li key={category.id}>
                <Link
                  to={`products/${category.name}`}
                  className={`text-base lg:pb-7 lg:px-4 lg:border-b-2 ${
                    isActive
                      ? "text-[#5ECE7B] border-[#5ECE7B]"
                      : "text-gray-700 border-transparent"
                  } hover:border-[#5ECE7B] hover:text-[#5ECE7B]`}
                  data-testid={
                    isActive ? "active-category-link" : "category-link"
                  }
                  onClick={() => {
                    closeMobileNav && closeMobileNav();
                  }}
                >
                  {category.name.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default withRouter(
  graphql<CombinedProps, {}, {}, CombinedProps>(GET_CATEGORIES)(Navigation)
);
