require 'net/http'
class PagesController < ApplicationController
  def index
  end

  def get_news
    news = { world: "http://news.google.com/news/feeds?pz=1&cf=all&ned=tr_tr&hl=tr&topic=w&output=rss", national: "http://news.google.com/news/feeds?pz=1&cf=all&ned=tr_tr&hl=tr&topic=n&output=rss", economics: "http://news.google.com/news/feeds?pz=1&cf=all&ned=tr_tr&hl=tr&topic=b&output=rss", science: "http://news.google.com/news/feeds?pz=1&cf=all&ned=tr_tr&hl=tr&topic=t&output=rss" }

    result = Net::HTTP.get(URI.parse(news[params[:kind].to_sym]))

    render text: result, format: :xml
  end
end
