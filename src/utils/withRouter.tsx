import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Location,
  NavigateFunction,
} from "react-router-dom";

// Define the type for the router props
export interface RouterProps {
  location: Location;
  navigate: NavigateFunction;
  params: Record<string, string | undefined>;
}

// Extend the props of the wrapped component
function withRouter<P extends object>(
  Component: React.ComponentType<P & RouterProps>
) {
  function ComponentWithRouterProp(props: P) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams<Record<string, string>>();

    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;
