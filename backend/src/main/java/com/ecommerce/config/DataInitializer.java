package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only seed if database is empty (preserves any manually added products)
        if (productRepository.count() > 0) {
            System.out.println("Products already exist in database. Skipping seed.");
            return;
        }

        System.out.println("Database is empty. Seeding product data...");

        List<Product> products = Arrays.asList(
                // ============ ANIME CATEGORY ============
                createProduct("Naruto Uzumaki Canvas Print",
                        "High-quality canvas print featuring Naruto in his iconic orange outfit with Konoha village backdrop. Perfect for any anime fan's collection.",
                        1499.00, "Anime", 50, "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500"),
                createProduct("Attack on Titan Wall Art",
                        "Stunning wall art depicting the Colossal Titan emerging from the wall. Museum-quality print on premium canvas.",
                        1799.00, "Anime", 35, "https://images.unsplash.com/photo-1607604276583-c6e7bbf3c7c8?w=500"),
                createProduct("Dragon Ball Z Goku Poster",
                        "Ultra Instinct Goku in action pose. High-resolution digital print with vibrant colors.",
                        999.00, "Anime", 100, "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=500"),
                createProduct("My Hero Academia Collection",
                        "Featuring Class 1-A heroes in an epic group pose. Limited edition print.",
                        2299.00, "Anime", 25, "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=500"),
                createProduct("One Piece Straw Hat Crew",
                        "The entire Straw Hat crew sailing on the Thousand Sunny. Glossy finish print.",
                        1899.00, "Anime", 40, "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=500"),
                createProduct("Demon Slayer Tanjiro Art",
                        "Tanjiro performing Water Breathing technique. Dynamic action scene with stunning water effects.",
                        1599.00, "Anime", 60, "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500"),
                createProduct("Jujutsu Kaisen Gojo Print",
                        "Gojo Satoru with his signature blindfold. Featuring the Infinity technique visualization.",
                        1699.00, "Anime", 45, "https://images.unsplash.com/photo-1607604276583-c6e7bbf3c7c8?w=500"),
                createProduct("Spy x Family Art Print",
                        "Adorable Anya Forger with her iconic expressions. Perfect for fans of the series.",
                        1199.00, "Anime", 75, "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=500"),
                createProduct("Chainsaw Man Denji Poster",
                        "Denji in his Chainsaw Devil form. Gritty and intense artwork.",
                        1399.00, "Anime", 55, "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=500"),
                createProduct("Tokyo Ghoul Ken Kaneki",
                        "Half-ghoul Ken Kaneki with iconic white hair and red eye. Dark and atmospheric.",
                        1549.00, "Anime", 30, "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500"),

                // ============ ABSTRACT ART CATEGORY ============
                createProduct("Cosmic Nebula Abstract",
                        "Swirling colors reminiscent of deep space nebulae. Mixed media on premium canvas.",
                        2499.00, "Abstract Art", 20,
                        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500"),
                createProduct("Geometric Harmony",
                        "Interlocking geometric shapes in vibrant colors. Modern minimalist design.",
                        1899.00, "Abstract Art", 30,
                        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=500"),
                createProduct("Ocean Waves Abstract",
                        "Blue and white abstract painting inspired by ocean waves. Calming and serene.",
                        2199.00, "Abstract Art", 25,
                        "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=500"),
                createProduct("Fire and Ice Contrast",
                        "Bold reds and cool blues colliding in abstract form. Statement piece.",
                        2799.00, "Abstract Art", 15,
                        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500"),
                createProduct("Golden Fluid Art",
                        "Luxurious gold, black and white fluid art piece. Elegant and sophisticated.",
                        3299.00, "Abstract Art", 10,
                        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=500"),
                createProduct("Neon Dreams",
                        "Electric neon colors in bold sweeping strokes. Urban contemporary style.",
                        1699.00, "Abstract Art", 40,
                        "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=500"),
                createProduct("Minimalist Lines",
                        "Simple black lines on white canvas creating depth and movement.",
                        1299.00, "Abstract Art", 50,
                        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500"),
                createProduct("Sunset Gradient Abstract",
                        "Warm orange and purple gradients blending seamlessly. Peaceful ambiance.",
                        1899.00, "Abstract Art", 35,
                        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=500"),
                createProduct("Splatter Expression",
                        "Jackson Pollock-inspired splatter art. Energetic and bold.",
                        2099.00, "Abstract Art", 28,
                        "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=500"),
                createProduct("Marble Effect Canvas",
                        "Sophisticated marble-like swirls in grey, gold and black.",
                        2399.00, "Abstract Art", 22,
                        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500"),

                // ============ SPIRITUAL CATEGORY ============
                createProduct("Om Mandala Art",
                        "Intricate mandala design with sacred Om symbol at center. Gold and purple tones.",
                        1799.00, "Spiritual", 40, "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500"),
                createProduct("Buddha Meditation Canvas",
                        "Serene Buddha in meditation pose. Peaceful gold and white color scheme.",
                        2199.00, "Spiritual", 30, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"),
                createProduct("Lotus Flower Awakening",
                        "Beautiful pink lotus flower symbolizing spiritual awakening. Watercolor style.",
                        1499.00, "Spiritual", 55, "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500"),
                createProduct("Chakra Alignment Art",
                        "Seven chakras displayed along the spine. Vibrant rainbow colors.",
                        1899.00, "Spiritual", 35, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"),
                createProduct("Zen Garden Print",
                        "Peaceful zen garden with raked sand and stones. Minimalist Japanese style.",
                        1599.00, "Spiritual", 45, "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500"),
                createProduct("Tree of Life Canvas",
                        "Ancient tree of life symbol with intricate root and branch details.",
                        2099.00, "Spiritual", 25, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"),
                createProduct("Sacred Geometry Collection",
                        "Flower of Life and other sacred geometry patterns. Gold on navy blue.",
                        2499.00, "Spiritual", 20, "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500"),
                createProduct("Ganesha Blessing Art",
                        "Lord Ganesha in vibrant traditional colors. Remover of obstacles.",
                        1899.00, "Spiritual", 40, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"),
                createProduct("Cosmic Third Eye",
                        "Third eye opening to the cosmos. Purple and galaxy-inspired.",
                        1699.00, "Spiritual", 50, "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500"),
                createProduct("Yin Yang Balance",
                        "Traditional yin yang symbol with modern artistic interpretation.",
                        1399.00, "Spiritual", 60, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"),

                // ============ CUSTOM CATEGORY ============
                createProduct("Custom Portrait Commission",
                        "Get your own custom portrait created by our talented artists. Digital artwork.",
                        3999.00, "Custom", 100, "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500"),
                createProduct("Pet Portrait Custom Art",
                        "Turn your beloved pet into a work of art. Various styles available.",
                        2999.00, "Custom", 100, "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500"),
                createProduct("Couple Portrait Painting",
                        "Romantic custom portrait of couples. Perfect anniversary gift.",
                        4499.00, "Custom", 100, "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500"),
                createProduct("Family Custom Canvas",
                        "Custom family portrait with all members. Including pets!",
                        5499.00, "Custom", 100, "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500"),
                createProduct("Anime Style Character",
                        "Get yourself drawn in anime style. Full color digital art.",
                        2499.00, "Custom", 100, "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500"),
                createProduct("Custom Logo Design",
                        "Professional logo design for your brand or business.",
                        3499.00, "Custom", 100, "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500"),
                createProduct("Wedding Portrait Art",
                        "Beautiful wedding day portrait in artistic style.",
                        4999.00, "Custom", 100, "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500"),
                createProduct("Memorial Portrait",
                        "Touching memorial portraits to honor loved ones. Sensitive and respectful.",
                        3499.00, "Custom", 100, "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500"),
                createProduct("Custom Landscape Painting",
                        "Your favorite location turned into beautiful canvas art.",
                        3999.00, "Custom", 100, "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500"),
                createProduct("Personalized Name Art",
                        "Your name designed in artistic typography. Great for kids' rooms.",
                        1999.00, "Custom", 100, "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500"));

        productRepository.saveAll(products);
        System.out.println("Successfully seeded " + products.size() + " products!");
    }

    private Product createProduct(String name, String description, Double price,
            String category, Integer stockQuantity, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setStockQuantity(stockQuantity);
        product.setImageUrl(imageUrl);
        return product;
    }
}
