export const formatName = (name: string): string => {
    name = name.replace(/[/\\?%*:|"<>]/g, '-');
    name = name.replace(/\.*$/, '');

    return name;
};
