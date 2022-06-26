//Extensions should not import working modules
export var PostType;
(function (PostType) {
    PostType["DISCORD"] = "discord";
    PostType["TWITTER"] = "twitter";
    PostType["DROPS"] = "drops";
})(PostType || (PostType = {}));
