export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {   name: 'image',
            title: 'Image',
            //the type is an array of images, which means its gonna have multiple set of images in a name.
            type: 'array',
            of: [{ type: 'image' }],
            //Enables the user interface for selecting what areas of an image should always be cropped, what areas should never be cropped, and the center of the area to crop around when resizing. The hotspot data is stored in the image field itself, not in the image asset, so images can have different crops for each place they are used.
            //Hotspot makes it possible to responsively adapt images to different aspect ratios at display time. The default value for hotspot is false.
            options: {
                hotspot: true,
            }
        },
        {   name: 'name',
            title: 'Name',
            type: 'string',
        },
        {   //A slug is a unique string (typically a normalized version of title or other representative string), often used as part of a URL. The input form will render an error message if the current slug field is not unique.
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                //The name of the field which the slug value is derived from. If a string is provided, it should match the name of the source field in your schema. If a function is provided, the source function is called with two parameters: doc (object - the current document) and options (object - with parent and parentPath keys for easy access to sibling fields).
                source: 'name',
                //Maximum number of characters the slug may contain when generating it from a source (like a title field) with the default slugify function. Defaults to 200. If you include your own slugify function, or manually enter your slug this option will be ignored.
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        }
    ]
}