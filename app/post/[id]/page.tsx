interface PostIdPage {
  params: {
    id: string;
  };
}

const postIdPage = async ({ params }: PostIdPage) => {
  return <div>{params.id}</div>;
};

export default postIdPage;
