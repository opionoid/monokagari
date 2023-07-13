type Props = {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export default function TaleCard({ id, title, description, tags }: Props) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
