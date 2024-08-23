// const CommentComponent: React.FC<{ comment: Comment; depth?: number }> = ({
//   comment,
//   depth = 0,
// }) => {
//   return (
//     <div className={`p-4 border rounded-md ${depth > 0 ? "ml-8" : ""}`}>
//       <div className="flex justify-between items-center mb-2">
//         <span className="font-bold">{comment.User.name}</span>
//         <span className="text-sm text-gray-500">
//           {new Date(comment.createdAt).toLocaleString()}
//         </span>
//       </div>
//       <p>{comment.content}</p>
//       {comment.replies && comment.replies.length > 0 && (
//         <div className="mt-4">
//           {comment.replies.map((reply) => (
//             <CommentComponent
//               key={reply.id}
//               comment={reply}
//               depth={depth + 1}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
