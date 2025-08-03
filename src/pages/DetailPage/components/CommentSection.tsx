import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SendIcon from '~/assets/send.svg?react';
import { LS, LSKeys } from '~/core/utils/localeStorage';

export default function CommentSection({
  characterId,
}: {
  characterId: string;
}) {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<{ text: string; date: Date }[]>([]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentsKey = LSKeys.comments + characterId;
    const existingComments = LS.get(commentsKey) || [];
    const newComments = [
      { text: newComment, date: new Date() },
      ...existingComments,
    ];

    LS.set(commentsKey, newComments);
    setComments(newComments);
    setNewComment('');
  };

  useEffect(() => {
    const commentsKey = LSKeys.comments + characterId;
    const storedComments = LS.get(commentsKey);
    if (storedComments) {
      setComments(storedComments);
    } else {
      setComments([]);
    }
  }, [characterId]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">{t('comments.title')}</h3>
      <div className="relative mb-6 flex h-13 w-full">
        <input
          type="text"
          placeholder={t('comments.add-comment')}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
          className="w-full rounded-lg bg-gray-200/80 px-4 py-2 outline-none"
        />
        <button
          onClick={handleAddComment}
          className={`
          absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-lg p-2.5`}
        >
          <SendIcon className="text-primary-600" />
        </button>
      </div>
      <div className="mt-2 mb-10 space-y-2">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">{t('comments.no-comments')}</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={`comment-${index}-${characterId}`}
              className="ml-auto rounded-lg rounded-br-md border border-gray-200 bg-gray-50 p-3 shadow-lg"
            >
              <p className="text-md text-black">{comment.text}</p>
              <p className="mt-1 text-right text-xs text-gray-500">
                {new Date(comment.date).toLocaleDateString() +
                  ' ' +
                  new Date(comment.date).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
