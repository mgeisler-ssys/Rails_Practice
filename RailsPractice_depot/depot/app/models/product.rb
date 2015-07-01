class Product < ActiveRecord::Base
  validates :title, :description, :image_url, presence: true
  validates :price , numericality: { greater_than_or_equal_to: 0.01 }
  validates :title, uniqueness: true
  validates_length_of :description, minimum: 10, message: "Description should be at least 10 chars."
  validates :image_url, allow_blank:
      true, format: {
    with: %r{\.(gif|jpg|png)\Z}i, 
    message: 'must be a URL for GIF JPG or PNG image.'
  }

  def self.latest
  	Product.order(:updated_at).last 
  end
  
end
