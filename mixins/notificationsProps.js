import { mapActions, mapGetters } from 'vuex';

export const notificationsProps = {
    computed: {
        ...mapGetters(['NOTIFICATIONS', 'NOTIFICATIONS_LENGTH', 'UNREAD']),
    },
    methods: {
        ...mapActions(['MARK_ALL_AS_READ', 'GET_NOTIFICATIONS', 'GET_UNREAD_NOTIFICATIONS']),
        clearNotificationCounter() {
            if (this.UNREAD != 0) {
                this.MARK_ALL_AS_READ();
            }
        },
    },
};
