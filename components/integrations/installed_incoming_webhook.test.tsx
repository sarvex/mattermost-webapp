// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Link} from 'react-router-dom';
import {shallow} from 'enzyme';

import {IncomingWebhook} from 'mattermost-redux/types/integrations';

import DeleteIntegration from 'components/integrations/delete_integration';
import InstalledIncomingWebhook from 'components/integrations/installed_incoming_webhook';
import {Channel, ChannelType} from 'mattermost-redux/types/channels';
import {TeamType} from 'mattermost-redux/types/teams';
import test_helper from 'packages/mattermost-redux/test/test_helper';
import {UserNotifyProps, UserProfile} from 'mattermost-redux/types/users';

describe('components/integrations/InstalledIncomingWebhook', () => {
    const incomingWebhook: IncomingWebhook = {
        id: '9w96t4nhbfdiij64wfqors4i1r',
        channel_id: '1jiw9kphbjrntfyrm7xpdcya4o',
        create_at: 1502455422406,
        delete_at: 0,
        description: 'build status',
        display_name: 'build',
        team_id: 'eatxocwc3bg9ffo9xyybnj4omr',
        update_at: 1502455422406,
        user_id: 'zaktnt8bpbgu8mb6ez9k64r7sa',
        username: 'username',
        icon_url: 'http://test/icon.png',
        channel_locked: false,
    };

    const fakeChannel = test_helper.fakeChannelWithId();
    const channel: Channel = {
        ...fakeChannel,
        type: 'O' as ChannelType,
        header: '',
        purpose: '',
        last_post_at: 0,
        last_root_post_at: 0,
        creator_id: 'b6911d07-dbf3-44f6-b9b5-90475f41933f',
        group_constrained: false,
    };
    const fakeTeam = test_helper.fakeTeamWithId();
    const team = {
        ...fakeTeam,
        id: 'eatxocwc3bg9ffo9xyybnj4omr',
        name: 'eatxocwc3bg9ffo9xyybnj4omr',
        description: 'team description',
        type: 'O' as TeamType,
        company_name: 'Company Name',
        allow_open_invite: false,
        group_constrained: false,
    };
    const fakeUser = test_helper.fakeUserWithId();
    const creator: UserProfile = {
        ...fakeUser,
        username: '3dbd736f-30e3-4993-a976-76d475388392',
        auth_data: '',
        auth_service: '',
        email_verified: true,
        nickname: 'The',
        position: '',
        props: {},
        notify_props: {} as UserNotifyProps,
        last_password_update: 0,
        last_picture_update: 0,
        failed_attempts: 0,
        mfa_active: false,
        mfa_secret: '',
        last_activity_at: 0,
        is_bot: true,
        bot_description: 'tester bot',
        bot_last_icon_update: 0,
        terms_of_service_id: '',
        terms_of_service_create_at: 0,
    };
    test('should match snapshot', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function

        const wrapper = shallow<InstalledIncomingWebhook>(
            <InstalledIncomingWebhook
                key={1}
                incomingWebhook={incomingWebhook}
                onDelete={emptyFunction}
                creator={creator}
                canChange={true}
                team={team}
                channel={channel}
                filter=''
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should not have edit and delete actions if user does not have permissions to change', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function

        const wrapper = shallow<InstalledIncomingWebhook>(
            <InstalledIncomingWebhook
                key={1}
                incomingWebhook={incomingWebhook}
                onDelete={emptyFunction}
                creator={creator}
                canChange={false}
                team={team}
                channel={channel}
                filter=''
            />,
        );
        expect(wrapper.find('.item-actions').length).toBe(0);
    });

    test('should have edit and delete actions if user can change webhook', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function

        const wrapper = shallow<InstalledIncomingWebhook>(
            <InstalledIncomingWebhook
                key={1}
                incomingWebhook={incomingWebhook}
                onDelete={emptyFunction}
                creator={creator}
                canChange={true}
                team={team}
                channel={channel}
                filter=''
            />,
        );
        expect(wrapper.find('.item-actions').find(Link).exists()).toBe(true);
        expect(wrapper.find('.item-actions').find(DeleteIntegration).exists()).toBe(true);
    });

    test('Should have the same name and description on view as it has in incomingWebhook', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function

        const wrapper = shallow<InstalledIncomingWebhook>(
            <InstalledIncomingWebhook
                key={1}
                incomingWebhook={incomingWebhook}
                onDelete={emptyFunction}
                creator={creator}
                canChange={false}
                team={team}
                channel={channel}
                filter=''
            />,
        );

        expect(wrapper.find('.item-details__description').text()).toBe('build status');
        expect(wrapper.find('.item-details__name').text()).toBe('build');
    });

    test('Should not display description as it is null', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function
        const newIncomingWebhook: IncomingWebhook = {...incomingWebhook, description: ''};
        const wrapper = shallow<InstalledIncomingWebhook>(
            <InstalledIncomingWebhook
                key={1}
                incomingWebhook={newIncomingWebhook}
                onDelete={emptyFunction}
                creator={creator}
                canChange={false}
                team={team}
                channel={channel}
                filter=''
            />,
        );
        expect(wrapper.find('.item-details__description').length).toBe(0);
    });

    test('Should not render any nodes as there are no filtered results', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function
        const wrapper = shallow<InstalledIncomingWebhook>(
            <InstalledIncomingWebhook
                key={1}
                incomingWebhook={incomingWebhook}
                onDelete={emptyFunction}
                creator={creator}
                filter={'someLongText'}
                canChange={false}
                team={team}
                channel={channel}
            />,
        );
        expect(wrapper.getElement()).toBe(null);
    });

    test('Should render a webhook item as filtered result is true', () => {
        function emptyFunction() {} //eslint-disable-line no-empty-function
        const wrapper = shallow<InstalledIncomingWebhook>(
            <InstalledIncomingWebhook
                key={1}
                incomingWebhook={incomingWebhook}
                onDelete={emptyFunction}
                creator={creator}
                filter={'buil'}
                canChange={true}
                team={team}
                channel={channel}
            />,
        );
        expect(wrapper.find('.item-details').exists()).toBe(true);
    });
});
