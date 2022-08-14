import React from "react";

import AppLayout from "components/Layouts/AppLayout";

const Movie = () => {
  return <div>Movie</div>;
};

Movie.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <AppLayout title="Movie" type="signedIn">
      {page}
    </AppLayout>
  );
};

export default Movie;
