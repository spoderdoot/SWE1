/**
 * This helper class defines a category
 *
 * @author Fernando Francisco Pfennig
 */
export class Category {

    constructor(private category: string) { }

    // This function returns the category
    public get getCategory() {
        return this.category;
    }
}
