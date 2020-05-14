Jekyll::Hooks.register :documents, :post_render do |document|
  # code to call after Jekyll renders a post
  # puts payload.inspect
end