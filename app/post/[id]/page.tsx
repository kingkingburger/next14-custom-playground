interface PostIdPage {
  params: {
    id: string;
  };
}

const postIdPage = async ({ params }: PostIdPage) => {
  console.log("params.id = ", params.id);
  return <div>{params.id}</div>;
};

export default postIdPage;
