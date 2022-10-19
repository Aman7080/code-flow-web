import Date from "./date";

export default function Comments({ comments = [] }) {
  return (
    <>
      <h3 className="mx-auto mt-10 mb-4 text-3xl leading-tight text-center">
        Comments:
      </h3>
      <ul>
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li key={_id} className="mb-5">
            <hr className="mb-5" />
            <p>{comment}</p>
            <p className="mb-2 leading-tight"> By{" "}
            <a href={`mailto:${email}` }className="italic">{name}</a> (
            <Date dateString={_createdAt} />)</p>
            <hr className="mt-5 mb-5" />
          </li>
        ))}
      </ul>
    </>
  );
}
