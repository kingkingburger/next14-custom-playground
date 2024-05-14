const PostIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return <main className="layout">{children}</main>;
};

export default PostIdLayout;
