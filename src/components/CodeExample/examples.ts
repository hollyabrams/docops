export const publishedReleaseNotesExample = `type ReleaseNote = {
  title: string;
  date: string;
  status: "draft" | "published";
};

function getPublishedReleaseNotes(
  releaseNotes: ReleaseNote[]
): ReleaseNote[] {
  return releaseNotes.filter(
    (releaseNote) => releaseNote.status === "published"
  );
}`;
