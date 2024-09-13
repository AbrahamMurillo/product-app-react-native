import { View, Text } from 'react-native'
import React from 'react'
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '../components/ui/CustomIcon';

interface Props {
    title: string;
    subTitle?: string;
    rightAction?: () => void;
    rightActionIcon?: string;
    children?: React.ReactNode
}

export default function MainLayout({ children, title, rightAction, rightActionIcon, subTitle }: Props) {

    const { canGoBack, goBack } = useNavigation()

    const { top } = useSafeAreaInsets()

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<CustomIcon name="arrow-back-outline" />}
            onPress={goBack}
        />
    )

    const RenderRightAction = () => {

        if (rightAction === undefined || rightActionIcon === undefined) return null
        return (
            <TopNavigationAction
                onPress={rightAction}
                icon={<CustomIcon name={rightActionIcon} />}
            />
        )
    }

    return (
        <Layout style={{ paddingTop: top }} >
            <TopNavigation
                title={title}
                subtitle={subTitle}
                alignment='center'
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction />}
            />
            <Divider />
            <Layout style={{ height: "100%" }} >
                {children}
            </Layout>
        </Layout>
    )
}