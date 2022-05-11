const postListing = (list) =>{
    const postlist = list.map(p => <li>p</li>);
    return (
      <ul>{postlist}</ul>
    );

}

export default postListing