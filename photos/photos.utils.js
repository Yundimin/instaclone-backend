export const processHashtags = (caption) => {
    const hashtags = caption.match(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g) || [];
    return hashtags.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    }));
  };

//   const hashtags = caption.match(/#[\w]+/g);
//   //   한글 해시태그
//   //   
//     hashtagObj = hashtags.map((hashtag) => ({
//       where: { hashtag },
//       create: { hashtag },
//     }));