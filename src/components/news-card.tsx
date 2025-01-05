import { View } from 'react-native'
import { INews } from '../utils/static-news'
import CustomText from './custom-text'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { theme } from '../config/theme'
import { Heart, Bookmark, Menu, EllipsisVertical } from 'lucide-react-native'
interface INewsCardProps {
    news: INews
}

export default function NewsCard({news}: INewsCardProps) {

    const timeAgo = (date: string) => {
      //use moment to get the time ago
      const now = moment();
      const then = moment(date);
      return now.diff(then, 'days') >= 1 ? `${now.diff(then, 'days')} days ago` : `${now.diff(then, 'hours')} hours ago`;
    }

    return (    
    <View>
        <FastImage source={{uri: news.image}} style={{width: '100%', height: 200, borderRadius: 20}} resizeMode="cover" />
        <CustomText variant="subheading" text={news.title} style={{marginTop: 10, fontSize: 18}} props={{numberOfLines: 2, ellipsizeMode: 'tail'}} />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 5, marginTop: 10}}>
                <FastImage source={{uri: news.authorImage}} style={{width: 16, height: 16, borderRadius: 100}} resizeMode="cover" />
                <CustomText variant="text" text={news.author} style={{fontSize: 10, fontWeight: '500'}} />
                <View style={{width: 2, height: 2, borderRadius: 100, backgroundColor: theme.colors.text}} />
                <CustomText variant="text" text={timeAgo(news.date)} style={{fontSize: 10}} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 20, marginTop: 10, marginRight: 10}}>
                <Heart size={16} color={theme.colors.textSecondary} />
                <Bookmark size={16} color={theme.colors.textSecondary} />
                <EllipsisVertical size={16} color={theme.colors.textSecondary} />
                
            </View>
        </View>
    </View>
    )
}